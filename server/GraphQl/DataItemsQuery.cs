using HotChocolate.Subscriptions;
using HotChocolateAplloClientSubscriptionsSample.Server.Models;

namespace HotChocolateAplloClientSubscriptionsSample.Server.GraphQl;

public class DataItemsQuery
{
    public DataItem DataItem(
        int itemId,
        [Service] IHttpClientFactory httpClientFactory,
        [Service] ITopicEventSender eventSender)
    {
        Task.Delay(3000)
            .ContinueWith(async _ =>
            {
                var client = httpClientFactory.CreateClient();
                var dataItem = await client.GetFromJsonAsync<DataItem>("https://v2.jokeapi.dev/joke/Pun");
                dataItem.Id = itemId;
                
                await eventSender.SendAsync($"dataitem_{itemId}", dataItem);
            });

        return default;
    }
}