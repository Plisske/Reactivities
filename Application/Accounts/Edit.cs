using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Persistence;
using Application.Core;

namespace Application.Accounts
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Account Account { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Account).SetValidator(new AccountValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Find the activity by Id, it is tracked for the entirety of this function.
                var account = await _context.Accounts.FindAsync(request.Account.Id);

                if (account == null) return null;

                _mapper.Map(request.Account, account);

                //change the title to what you want. If null, keep it the same.
                //activity.Title = request.Activity.Title ?? activity.Title;

                //saves changes.
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}