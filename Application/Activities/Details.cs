using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>> //fetches data only
        {
            public Guid Id { get; set; } //Get the primary key (Id) from the particular post
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            // finds the requested Id.
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity =  await _context.Activities.FindAsync(request.Id);//contains an object or null

                return Result<Activity>.Success(activity);
            }
        }

    }
}
