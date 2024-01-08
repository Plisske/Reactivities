using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Accounts
{
    public class Details
    {
        public class Query : IRequest<Result<Account>> //fetches data only
        {
            public Guid Id { get; set; } //Get the primary key (Id) from the particular post
        }

        public class Handler : IRequestHandler<Query, Result<Account>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            // finds the requested Id.
            public async Task<Result<Account>> Handle(Query request, CancellationToken cancellationToken)
            {
                var account = await _context.Accounts
                    .ProjectTo<Account>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<Account>.Success(account);
            }
        }

    }
}
