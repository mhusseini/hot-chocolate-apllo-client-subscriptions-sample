using HotChocolateAplloClientSubscriptionsSample.Server.GraphQl;
var appBuilder = WebApplication.CreateBuilder(args);

//
// Services
//
var serviceCollection = appBuilder.Services;

serviceCollection
    .AddCors(builder => builder
        .AddDefaultPolicy(policy => policy
            .WithOrigins("*")
            .WithMethods("*")
            .WithHeaders("*")));

serviceCollection
    .AddHttpClient();

serviceCollection
    .AddGraphQLServer()
    .AddQueryType<DataItemsQuery>()
    .AddInMemorySubscriptions()
    .AddSubscriptionType<DataItemSubscriptions>();

//
// Pipeline
//
var app = appBuilder.Build();

app.UseWebSockets();
app.UseCors();
app.MapGraphQL();

app.Run();