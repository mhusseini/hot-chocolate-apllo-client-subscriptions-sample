namespace HotChocolateAplloClientSubscriptionsSample.Server.Models;

public record DataItem
{
    public int Id { get; set; }

    public string Category { get; set; }

    public string Type { get; set; }

    public string Setup { get; set; }

    public string Delivery { get; set; }
}