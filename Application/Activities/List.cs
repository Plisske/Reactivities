using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Activities
{
	public class List
	{
		public class Query : IRequest<Result<List<ActivityDto>>> { } //Pass a query, empty list.

        //Request is sent to handler
        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            //The Query forms a Request, Cancellation Tokens allows us to interrupt and cancel requests.
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {//returning a task, make it async.
                //Handler specifies the data we are looking for here inside the IRequest interface. (which passed the query)

                var activities = await _context.Activities //Gets activities
//                    .Include(a => a.Attendees) //gets our attendees (our join table)
//                    .ThenInclude(u => u.AppUser) //gets users from our attendees.
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                
                //var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);

                return Result<List<ActivityDto>>.Success(activities);
            }
        }


    }
}
