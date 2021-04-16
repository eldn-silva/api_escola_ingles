const { Router } = require('express');

const TurmasController = require('../controllers/TurmaController');

const router = Router()

router.get('/turmas', TurmasController.pegaTodasAsTurmas);
router.get('/turmas/:id', TurmasController.pegaUmaTurma);
router.post('/turmas', TurmasController.criaTurma);
router.put('/turmas/:id', TurmasController.atualizaTurma);
router.delete('/turmas/:id', TurmasController.deletaTurma);

module.exports = router