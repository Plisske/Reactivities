using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
	public class Edit
	{
		public class Command : IRequest
		{
			public Activity Activity { get; set; }
		}

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
				//Find the activity by Id, it is tracked for the entirety of this function.
				var activity = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity, activity);

                //change the title to what you want. If null, keep it the same.
                //activity.Title = request.Activity.Title ?? activity.Title;

                //saves changes.
                await _context.SaveChangesAsync();

            }
        }
    }
}