﻿using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Activities
{
	public class List
	{
		public class Query : IRequest<List<Activity>> { } //Pass a query, empty list.

        //Request is sent to handler
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }



            //The Query forms a Request, Cancellation Tokens allows us to interrupt and cancel requests.
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {//returning a task, make it async.
                //Handler specifies the data we are looking for here inside the IRequest interface. (which passed the query)
                return await _context.Activities.ToListAsync();
            }
        }


    }
}