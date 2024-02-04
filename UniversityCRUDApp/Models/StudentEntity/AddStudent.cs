using System.Runtime.InteropServices;

namespace UniversityCRUDApp.Models.StudentEntity
{
    public class AddStudent
    {
        public string StudentName { get; set; }

        public string Email { get; set; }

        public Guid UniversityID { get; set; }



    }
}
