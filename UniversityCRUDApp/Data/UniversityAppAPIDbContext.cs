using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using UniversityCRUDApp.Models.CourseEntity;
using UniversityCRUDApp.Models.StudentCourseEntity;
using UniversityCRUDApp.Models.StudentEntity;
using UniversityCRUDApp.Models.UniversityEntity;

namespace UniversityCRUDApp.Data
{
    public class UniversityAppAPIDbContext : DbContext
    {
        public UniversityAppAPIDbContext(DbContextOptions options) : base(options)
        {
        }
        //to create a specific table do it in A dbset<classname(in code)> (Table name(will be displayed as will in database))
        public DbSet<Student> Students { get; set; }
        public DbSet<University> Universities { get; set;}
        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Setting composite primary key for m-m relationship of student with course entities
            modelBuilder.Entity<StudentCourse>().HasKey(sc => new { sc.StudentId, sc.CourseId });

        }
    }
}
