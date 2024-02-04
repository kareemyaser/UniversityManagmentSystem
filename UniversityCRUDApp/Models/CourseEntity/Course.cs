using UniversityCRUDApp.Models.StudentCourseEntity;

namespace UniversityCRUDApp.Models.CourseEntity
{
    public class Course
    {
        public Guid Id { get; set; }
        public string CourseName { get; set; }

        public string CourseAbbriviation { get; set; }
        public virtual List<StudentCourse> StudentCourses { get; set; }

    }
}
