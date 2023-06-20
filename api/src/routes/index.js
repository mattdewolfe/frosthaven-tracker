import { Router } from "express";
import indexRoutes from "./indexRoutes";
import enumRoutes from "./enumRoutes";
<<<<<<< HEAD
import playerRoutes from "./playerRoutes";
import eventRoutes from "./eventRoutes";
=======
>>>>>>> dev

const router = Router();

router.use('/', indexRoutes);
<<<<<<< HEAD
router.use('/enums', enumRoutes);
router.use('/players', playerRoutes);
router.use('/events', eventRoutes);
=======
router.use('/enum', enumRoutes);
>>>>>>> dev

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
