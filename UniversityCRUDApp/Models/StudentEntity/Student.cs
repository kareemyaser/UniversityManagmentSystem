using System.ComponentModel.DataAnnotations.Schema;
using UniversityCRUDApp.Models.CourseEntity;
using UniversityCRUDApp.Models.StudentCourseEntity;
using UniversityCRUDApp.Models.UniversityEntity;

namespace UniversityCRUDApp.Models.StudentEntity
{
    public class Student
    {
        public Guid Id { get; set; }
        public string StudentName { get; set; }

        public string Email { get; set; }

        [ForeignKey("University")]
        public Guid UniversityId { get; set; }
        public University University { get; set; }
        //public University university {get;set;}
        public virtual List<StudentCourse> StudentCourses { get; set; }

    }
}
