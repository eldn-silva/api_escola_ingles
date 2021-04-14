const database = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas(req, res) { //com o static não precisa criar uma nova instância para clamar o método
        try {
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne( { 
                where: { 
                    id: Number(id) 
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json(novaPessoaCriada)

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const novasInfos = req.body;
        const { id } = req.params;
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) }})
            const pessoaAtualizada = await database.Pessoas.findOne( { 
                where: { 
                    id: Number(id) 
                }
            })
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({ 
                where: { 
                    id: Number(id) 
                }
            })
            return res.status(200).json({ mensagem: `id nº ${id} deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController