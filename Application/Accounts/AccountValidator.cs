using Domain;
using FluentValidation;

namespace Application.Accounts
{
    public class AccountValidator : AbstractValidator<Account>
    {
        public AccountValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Balance).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }
    }
}
