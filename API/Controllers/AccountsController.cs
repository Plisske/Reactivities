using Domain;
using Application.Accounts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AccountsController : BaseApiController
    {
        // Mediator is private within the parent class (BaseApiController)

        //[Http"something"] = end points
        [HttpGet] //For getting ALL resources
        // api/activities
        public async Task<ActionResult<List<Account>>> GetAccounts()
        {
            return HandleResult(await Mediator.Send(new List.Query())); //Sends a request to the mediator.
        }

        [HttpGet("{id}")]//for getting specific resources
        //api/activities/asddfgfsa
        public async Task<IActionResult> GetAccounts(Guid id) //IActionResults returns HTTP responses
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost] //for creating resources
        //IActionResult is similar to "any" type.
        public async Task<IActionResult> CreateAccount(Account account) //creates a new activity
        {
            return HandleResult(await Mediator.Send(new Create.Command { Account = account }));
        }

        //[Authorize(Policy = "IsAccountHost")]
        [HttpPut("{id}")] //For updating resources
        public async Task<IActionResult> EditAccount(Guid id, Account account)
        {
            account.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Account = account }));
        }

        //[Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}
