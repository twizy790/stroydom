namespace Stroydom.Api.Models;

public enum StageStatus { Planned, InProgress, Done }
public enum TaskStatus { Planned, InProgress, Done }
public enum PurchaseStatus { Planned, Ordered, Delivered }

public class Client
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public List<ConstructionProject> Projects { get; set; } = new();
}

public class ConstructionProject
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Area { get; set; }
    public decimal Budget { get; set; }
    public DateTime CreatedAt { get; set; }
    public int ClientId { get; set; }
    public Client? Client { get; set; }
    public List<ConstructionStage> Stages { get; set; } = new();
    public List<ConstructionTask> Tasks { get; set; } = new();
    public List<Purchase> Purchases { get; set; } = new();
    public List<Expense> Expenses { get; set; } = new();
    public List<ProjectDocument> Documents { get; set; } = new();
}

public class ConstructionStage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }
    public int Progress { get; set; }
    public StageStatus Status { get; set; }
    public int ProjectId { get; set; }
    public ConstructionProject? Project { get; set; }
}

public class ConstructionTask
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Assignee { get; set; } = string.Empty;
    public TaskStatus Status { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int ProjectId { get; set; }
    public ConstructionProject? Project { get; set; }
}

public class Purchase
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Supplier { get; set; } = string.Empty;
    public string Quantity { get; set; } = string.Empty;
    public decimal TotalPrice { get; set; }
    public PurchaseStatus Status { get; set; }
    public int ProjectId { get; set; }
    public ConstructionProject? Project { get; set; }
}

public class Expense
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime SpentAt { get; set; }
    public int ProjectId { get; set; }
    public ConstructionProject? Project { get; set; }
}

public class ProjectDocument
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public int ProjectId { get; set; }
    public ConstructionProject? Project { get; set; }
}
