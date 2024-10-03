using Microsoft.EntityFrameworkCore;
using services_app.Models;
using System.Collections.Generic;

namespace services_app.Services
{
    public interface IServiceUsers
    {
        public UserContext? db { get; set; }
        public IEnumerable<User>? Read();
        public User Create(User? user);
        public bool Update(User? user);
        public bool Delete(int id);
        public User GetUserById(int id);
    }
    public class ServiceUsers : IServiceUsers
    {
        
        public UserContext? db { get; set; }
       
        public User? Create(User? user)
        {
            db.Users.Add(user);
            db.SaveChanges();
            return user;
        }

        public bool Delete(int id)
        {
            var user = db.Users.Find(id);
            if (user == null)
            {
                return false;
            }

            db.Users.Remove(user);
            db.SaveChanges(); 
            return true; 
        }


        public User GetUserById(int id)
        {
            return db.Users.Find(id);
        }

        public IEnumerable<User>? Read()
        {
            return db.Users.ToList();
        }

        public bool Update(User user)
        {
            var existingUser = db.Users.Find(user.Id);
            if (existingUser == null)
            {
                return false;
            }
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.EmailName = user.EmailName;

            db.SaveChanges();

            return true;
        }
    }
}
