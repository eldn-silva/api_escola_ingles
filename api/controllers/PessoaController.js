const database = require('../models');
const Sequelize = require('sequelize');

class PessoaController {
    static async pegaPessoasAtivas(req, res) { //com o static não precisa criar uma nova instância para clamar o método
        try {
            const pessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsPessoas(req, res) { //com o static não precisa criar uma nova instância para clamar o método
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
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

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore( {where: { id: Number(id) } } )
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne( { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada)

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const novasInfos = req.body;
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.update(novasInfos, { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }})
            const matriculaAtualizada = await database.Matriculas.findOne( { 
                where: { 
                    id: Number(matriculaId) 
                }
            })
            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.destroy({ 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json({ mensagem: `id de matrícula nº ${matriculaId}, correspondente ao id de pessoa nº ${estudanteId} deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.restore({
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            
            const pessoa = await database.Pessoas.findOne({ where: {id: Number(estudanteId)} })

            const matriculas = await pessoa.getAulasMatriculadas() // método que sequelize gera automaticamente

            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasAsMatriculas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        turma_id: Number(turmaId),
                        status: 'confirmado'
                    },
                    limit: 20,
                    order: [['estudante_id', 'ASC']]
                })
            res.status(200).json(todasAsMatriculas)
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 1;
        try {
            const turmasLotadas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'], //Agrupando os resultados considerando os atributos da coluna turma_id
                    group: ['turma_id'], // agrega os dados
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) // filtra os dados agregados
                })
            return res.status(200).json(turmasLotadas.count); 
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            database.sequelize.transaction(async transacao => {
                await database.Pessoas
                    .update({ ativo: false }, { where: { id: Number(estudanteId) } }, { transaction: transacao }) // método update só retorna 0 ou 1.
    
                await database.Matriculas
                    .update({ status: 'cancelado' }, { where: { estudante_id: Number(estudanteId) } }, { transaction: transacao })
    
                return res.status(200).json({ message: `matrículas ref. estudante ${estudanteId} canceladas` }); 
            })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController