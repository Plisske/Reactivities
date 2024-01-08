using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Accounts
{
    public class List
    {
        public class Query : IRequest<Result<List<Account>>> { } //Pass a query, empty list.

        //Request is sent to handler
        public class Handler : IRequestHandler<Query, Result<List<Account>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            //The Query forms a Request, Cancellation Tokens allows us to interrupt and cancel requests.
            public async Task<Result<List<Account>>> Handle(Query request, CancellationToken cancellationToken)
            {//returning a task, make it async.
                //Handler specifies the data we are looking for here inside the IRequest interface. (which passed the query)

                var accounts = await _context.Accounts //Gets activities
                                                           //                    .Include(a => a.Attendees) //gets our attendees (our join table)
                                                           //                    .ThenInclude(u => u.AppUser) //gets users from our attendees.
                    .ProjectTo<Account>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                //var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);

                return Result<List<Account>>.Success(accounts);
            }
        }


    }
}
