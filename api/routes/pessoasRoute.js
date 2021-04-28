const { Router } = require('express');

const PessoaController = require('../controllers/PessoaController');
const MatriculaController = require('../controllers/MatriculaController');

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegaUmaMatricula);
router.get('/pessoas/:estudanteId/matricula', MatriculaController.pegaMatriculas);
router.get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma);
router.get('/pessoas/matricula/lotada', MatriculaController.pegaTurmasLotadas);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizaMatricula);
router.post('/pessoas', PessoaController.criaPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);
router.post('/pessoas/:estudanteId/matricula', MatriculaController.criaMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', MatriculaController.restauraMatricula);
router.delete('/pessoas/:id', PessoaController.deletaPessoa);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.deletaMatricula);

module.exports = router