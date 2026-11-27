using Stroydom.Api.Data;
using Stroydom.Api.Models;
using TaskState = Stroydom.Api.Models.TaskStatus;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ConstructionStore>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy => policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("frontend");

app.MapGet("/api/health", () => Results.Ok(new
{
    service = "СтройКонтроль API",
    status = "ok",
    time = DateTimeOffset.UtcNow
}));

app.MapGet("/api/clients", (ConstructionStore store) =>
    Results.Ok(store.Clients
        .OrderBy(client => client.LastName)
        .Select(client => new
        {
            client.Id,
            client.FirstName,
            client.LastName,
            client.Phone,
            client.Email,
            Projects = client.Projects.Select(project => new { project.Id, project.Name })
        })));

app.MapGet("/api/projects", (ConstructionStore store) =>
    Results.Ok(store.Projects
        .OrderByDescending(project => project.CreatedAt)
        .Select(ProjectSummary)));

app.MapGet("/api/projects/{id:int}", (int id, ConstructionStore store) =>
{
    var project = store.Projects.SingleOrDefault(item => item.Id == id);

    return project is null ? Results.NotFound() : Results.Ok(ProjectDetails(project));
});

app.MapPost("/api/projects", (CreateProjectRequest request, ConstructionStore store) =>
{
    var client = store.Clients.SingleOrDefault(item => item.Id == request.ClientId);
    if (client is null)
    {
        return Results.BadRequest(new { message = "Клиент не найден" });
    }

    var project = new ConstructionProject
    {
        Name = request.Name,
        Address = request.Address,
        Area = request.Area,
        Budget = request.Budget,
        ClientId = request.ClientId,
        Id = store.Projects.Count + 1,
        CreatedAt = DateTime.UtcNow,
        Stages = new[] { "Подготовка участка", "Фундамент", "Возведение стен", "Кровля", "Коммуникации", "Отделка и сдача" }
            .Select((name, index) => new ConstructionStage
            {
                Name = name,
                Order = index + 1,
                Status = index == 0 ? StageStatus.InProgress : StageStatus.Planned
            }).ToList()
    };

    store.Projects.Add(project);
    client.Projects.Add(project);
    return Results.Created($"/api/projects/{project.Id}", ProjectDetails(project));
});

app.MapPatch("/api/tasks/{id:int}/status", (int id, UpdateTaskStatusRequest request, ConstructionStore store) =>
{
    var task = store.Tasks.SingleOrDefault(item => item.Id == id);
    if (task is null)
    {
        return Results.NotFound();
    }

    task.Status = request.Status;
    task.CompletedAt = request.Status == TaskState.Done ? DateTime.UtcNow : null;
    return Results.Ok(task);
});

app.Run();

static object ProjectSummary(ConstructionProject project) => new
{
    project.Id,
    project.Name,
    project.Address,
    project.Area,
    project.Budget,
    project.CreatedAt,
    Client = project.Client is null ? null : new
    {
        project.Client.Id,
        project.Client.FirstName,
        project.Client.LastName
    },
    Stages = project.Stages.OrderBy(stage => stage.Order).Select(stage => new
    {
        stage.Id,
        stage.Name,
        stage.Order,
        stage.Progress,
        stage.Status
    }),
    Tasks = project.Tasks.Select(task => new
    {
        task.Id,
        task.Title,
        task.Assignee,
        task.Status,
        task.DueDate
    })
};

static object ProjectDetails(ConstructionProject project) => new
{
    Project = ProjectSummary(project),
    Purchases = project.Purchases.Select(purchase => new
    {
        purchase.Id,
        purchase.Name,
        purchase.Supplier,
        purchase.Quantity,
        purchase.TotalPrice,
        purchase.Status
    }),
    Expenses = project.Expenses.Select(expense => new
    {
        expense.Id,
        expense.Description,
        expense.Amount,
        expense.SpentAt
    }),
    Documents = project.Documents.Select(document => new
    {
        document.Id,
        document.Name,
        document.Type,
        document.FileName
    })
};

public record CreateProjectRequest(string Name, string Address, decimal Area, decimal Budget, int ClientId);
public record UpdateTaskStatusRequest(TaskState Status);
