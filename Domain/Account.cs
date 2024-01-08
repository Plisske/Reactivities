using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Domain
{
    public class Account
    {
        public Guid Id { get; set; } //specifically call this "Id" to determine primary key in database 
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public double Balance { get; set; }
        public string Category { get; set; }

    }
}
