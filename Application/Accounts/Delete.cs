using MediatR;
using Persistence;
using Application.Core;

namespace Application.Accounts
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context; //Context is your local storage, the cache.
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //DOES NOT account for null values
                var account = await _context.Accounts.FindAsync(request.Id);

                if (account == null) return null;

                //removes the activity from memory
                _context.Remove(account);
                //saves changes
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}