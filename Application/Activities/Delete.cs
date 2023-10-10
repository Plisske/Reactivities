using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                //DOES NOT account for null values
                var activity = await _context.Activities.FindAsync(request.Id);
                //removes the activity from memory
                _context.Remove(activity);
                //saves changes
                await _context.SaveChangesAsync();
            }
        }
    }
}