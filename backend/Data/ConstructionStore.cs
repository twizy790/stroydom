using Stroydom.Api.Models;

namespace Stroydom.Api.Data;

public class ConstructionStore
{
    public List<Client> Clients { get; } = new();
    public List<ConstructionProject> Projects { get; } = new();
    public List<ConstructionTask> Tasks { get; } = new();

    public ConstructionStore()
    {
        var client = new Client
        {
            Id = 1,
            FirstName = "Александр",
            LastName = "Соколов",
            Phone = "+7 917 240-18-42",
            Email = "sokolov@example.ru"
        };

        var project = new ConstructionProject
        {
            Id = 1,
            Name = "Дом для семьи Соколовых",
            Address = "КП «Сосновый берег», участок 18",
            Area = 164,
            Budget = 8450000,
            ClientId = client.Id,
            Client = client,
            CreatedAt = DateTime.UtcNow.AddMonths(-6)
        };

        project.Stages = new List<ConstructionStage>
        {
            new() { Id = 1, Name = "Подготовка участка", Order = 1, Status = StageStatus.Done, Progress = 100, ProjectId = project.Id },
            new() { Id = 2, Name = "Фундамент", Order = 2, Status = StageStatus.Done, Progress = 100, ProjectId = project.Id },
            new() { Id = 3, Name = "Возведение стен", Order = 3, Status = StageStatus.InProgress, Progress = 68, ProjectId = project.Id },
            new() { Id = 4, Name = "Кровля", Order = 4, Status = StageStatus.Planned, ProjectId = project.Id },
            new() { Id = 5, Name = "Коммуникации", Order = 5, Status = StageStatus.Planned, ProjectId = project.Id },
            new() { Id = 6, Name = "Отделка и сдача", Order = 6, Status = StageStatus.Planned, ProjectId = project.Id }
        };

        project.Tasks = new List<ConstructionTask>
        {
            new() { Id = 1, Title = "Залить плиту перекрытия", Assignee = "МК", Status = Stroydom.Api.Models.TaskStatus.InProgress, DueDate = DateTime.UtcNow.AddDays(1), ProjectId = project.Id },
            new() { Id = 2, Title = "Проверить кладку внешних стен", Assignee = "ИВ", Status = Stroydom.Api.Models.TaskStatus.Planned, DueDate = DateTime.UtcNow.AddDays(5), ProjectId = project.Id }
        };

        project.Purchases = new List<Purchase>
        {
            new() { Id = 1, Name = "Бетон М300", Supplier = "КазаньБетон", Quantity = "12 м³", TotalPrice = 96000, Status = PurchaseStatus.Ordered, ProjectId = project.Id }
        };

        project.Expenses = new List<Expense>
        {
            new() { Id = 1, Description = "Работы по фундаменту", Amount = 1120000, SpentAt = DateTime.UtcNow.AddMonths(-3), ProjectId = project.Id }
        };

        project.Documents = new List<ProjectDocument>
        {
            new() { Id = 1, Name = "Договор подряда № Д-026", Type = "Договор", FileName = "contract-d026.pdf", ProjectId = project.Id }
        };

        client.Projects.Add(project);
        Clients.Add(client);
        Projects.Add(project);
        Tasks.AddRange(project.Tasks);
    }
}
