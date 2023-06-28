import { Router } from "express";
import indexRoutes from "./indexRoutes";
import enumRoutes from "./enumRoutes";
import playerRoutes from "./playerRoutes";
import eventRoutes from "./eventRoutes";

const router = Router();

router.use('/', indexRoutes);
router.use('/enums', enumRoutes);
router.use('/players', playerRoutes);
router.use('/events', eventRoutes);

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
