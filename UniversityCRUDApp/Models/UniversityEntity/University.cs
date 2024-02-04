using UniversityCRUDApp.Models.StudentEntity;

namespace UniversityCRUDApp.Models.UniversityEntity
{
    public class University
    {
        public Guid Id { get; set; }
        public string UniversityName { get; set; }

        public string Location { get; set; }
        public List<Student> Students { get; set; }


    }
}
