using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_Framework.Api.Models
{
    [Table("Produto", Schema = "EcommerceFramework")]
    public class ProdutoModel { 
         public ProdutoModel() { }
            public ProdutoModel(int id, string produto, string descricao, double  valor, int saldoestoque,string img)
            {
                this.ProdutoId = id;
                this.Produto = produto;
                this.Descricao = descricao;
                this.Valor = valor;
                this.SaldoEstoque = saldoestoque;
                this.Img = img;
            }
    
        [Key]
        public int ProdutoId { get; set; }
        [Required, MaxLength(100)]
        public string Produto { get; set; }
        [MaxLength(300)]
        public string Descricao { get; set; }
        [Required]
        public Double Valor { get; set; }
        public int SaldoEstoque { get; set; }
        [MaxLength(100)]
        public string Img { get; set; }

    }
}
