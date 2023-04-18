using HotChocolateAplloClientSubscriptionsSample.Server.Models;

namespace HotChocolateAplloClientSubscriptionsSample.Server.GraphQl;

public class DataItemSubscriptions
{
    [Subscribe]
    [Topic("dataitem_{itemId}")] 
    public Task<DataItem> DataItem(int itemId, [EventMessage] DataItem dataItem)
    {
        return Task.FromResult(dataItem);
    }
}