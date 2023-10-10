using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            //Match properties of the former Activity with the Updated Activity
            CreateMap<Activity, Activity>();
        }
    }
}