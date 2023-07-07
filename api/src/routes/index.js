import { Router } from 'express';
import indexRoutes from './indexRoutes';
import enumRoutes from './enumRoutes';
import playerRoutes from './playerRoutes';
import statRoutes from './statRoutes';
import scenarioRoutes from './scenarioRoutes';
import elementRoutes from './elementRoutes';

const router = Router();

router.use('/', indexRoutes);
router.use('/enums', enumRoutes);
router.use('/players', playerRoutes);
router.use('/stats', statRoutes);
router.use('/scenarios', scenarioRoutes);
router.use('/elements', elementRoutes);

// Handle 404 errors
router.use((req, res) => {
    res.status(404).json({
        success: false,
        errors: [{
            message: `Could not find route: ${req.originalUrl}`,
        }],
    });
});

export default router;
