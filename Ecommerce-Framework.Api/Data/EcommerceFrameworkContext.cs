using Ecommerce_Framework.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_Framework.Api.Data
{
    public class EcommerceFrameworkContext : DbContext
    {


        #region Constructor
        public EcommerceFrameworkContext(DbContextOptions options) : base(options) { }
        #endregion

        public DbSet<ProdutoModel> Produtos { get; set; }
        public DbSet<UsuarioModel> Usuarios { get; set; }





    }
}


