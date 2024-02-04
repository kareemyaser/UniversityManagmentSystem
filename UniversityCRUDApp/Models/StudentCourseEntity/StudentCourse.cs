using System.ComponentModel.DataAnnotations.Schema;
using UniversityCRUDApp.Models.CourseEntity;
using UniversityCRUDApp.Models.StudentEntity;

namespace UniversityCRUDApp.Models.StudentCourseEntity
{
    public class StudentCourse
    {
        [ForeignKey("Student")]
        public Guid StudentId { get; set; }
        public Student Student { get; set; }

        [ForeignKey("Course")]
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
    }
}
