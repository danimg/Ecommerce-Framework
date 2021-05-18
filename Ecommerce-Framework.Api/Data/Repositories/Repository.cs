

using Ecommerce_Framework.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce_Framework.Api.Data.Repositories
{
    public class Repository : IRepository
    {
        private readonly EcommerceFrameworkContext _context;

        public Repository(EcommerceFrameworkContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<ProdutoModel[]> GetAllProdutoAsync()
        {
            IQueryable<ProdutoModel> query = _context.Produtos;

            query = query.AsNoTracking()
                         .OrderBy(c => c.ProdutoId);

            return await query.ToArrayAsync();
        }

        public async Task<ProdutoModel> GetProdutoAsyncById(int produtoId)
        {
            IQueryable<ProdutoModel> query = _context.Produtos;

            query = query.AsNoTracking()
                   .OrderBy(produto => produto.ProdutoId)
                   .Where(produto => produto.ProdutoId == produtoId);

            return await query.FirstOrDefaultAsync();
        }



    }
}
