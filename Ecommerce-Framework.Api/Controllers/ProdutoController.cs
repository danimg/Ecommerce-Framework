using Ecommerce_Framework.Api.Data;
using Ecommerce_Framework.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;



namespace Ecommerce_Framework.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly IRepository _repository;

        public ProdutoController(IRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repository.GetAllProdutoAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{ProdutosId}")]
        public async Task<IActionResult> GetByProdutosId(int produtoId)
        {
            try
            {
                var result = await _repository.GetProdutoAsyncById(produtoId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> post(ProdutoModel model)
        {
            try
            {
                _repository.Add(model);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{produtoId}")]
        public async Task<IActionResult> put(int produtoId, ProdutoModel model)
        {
            try
            {
                var produto = await _repository.GetProdutoAsyncById(produtoId);
                if (produto == null) return NotFound();

                _repository.Update(model);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{produtoId}")]
        public async Task<IActionResult> delete(int produtoId)
        {
            try
            {
                var produto =  _repository.GetProdutoAsyncById(produtoId);
                if (produto == null) return NotFound();

                _repository.Delete(produto);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok("Deletado");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

    }
}