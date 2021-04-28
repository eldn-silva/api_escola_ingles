const Sequelize = require('sequelize');
const { MatriculasServices } = require('../services');
const matriculasServices = new MatriculasServices();

class MatriculaController {
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await matriculasServices.pegaUmRegistro({id: matriculaId, estudante_id: estudanteId});
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula);
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const novasInfos = req.body;
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.atualizaRegistros(novasInfos, {id: Number(matriculaId), estudante_id: Number(estudanteId)});
            return res.status(200).json({ mensagem: `id ${matriculaId} atualizado!!` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await matriculasServices.apagaRegistro({estudante_id: estudanteId, id: matriculaId});
            return res.status(200).json({ mensagem: `id de matrícula nº ${matriculaId}, correspondente ao id de pessoa nº ${estudanteId} deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { matriculaId } = req.params
        try {
            await matriculasServices.restauraRegistro(matriculaId)
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
            const todasAsMatriculas = await matriculasServices
                .encontraEContaRegistros(
                    { turma_id: Number(turmaId), status: 'confirmado' },
                    { limit: 20, order: [['estudante_id', 'DESC']] })
            res.status(200).json(todasAsMatriculas) 
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await matriculasServices
                .encontraEContaRegistros({ status: 'confirmado' },
                {
                    attributes: ['turma_id'], //Agrupando os resultados considerando os atributos da coluna turma_id
                    group: ['turma_id'], // agrega os dados
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) // filtra os dados agregados
                })
            return res.status(200).json(turmasLotadas.count); 
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = MatriculaController;