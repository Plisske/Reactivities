using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //dependency injection
        private readonly DataContext context;

        public ActivitiesController(DataContext context)
        {
            this.context = context;
        }

        //end point
        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await this.context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //api/activities/asddfgfsa
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await this.context.Activities.FindAsync(id);
        }


    }
}
