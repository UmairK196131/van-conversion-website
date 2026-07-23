import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { uploadMiddleware } from '../../lib/upload.js';
import {
  getDashboardStats,
  listActivityLogs,
  uploadImage,
} from '../../controllers/admin/dashboardController.js';
import * as servicesController from '../../controllers/admin/servicesController.js';
import * as projectsController from '../../controllers/admin/projectsController.js';
import * as blogController from '../../controllers/admin/blogController.js';
import * as testimonialsController from '../../controllers/admin/testimonialsController.js';
import * as inquiriesController from '../../controllers/admin/inquiriesController.js';
import * as faqController from '../../controllers/admin/faqController.js';

const router = Router();

router.use(requireAuth);

router.get('/dashboard', getDashboardStats);
router.get('/activity', listActivityLogs);
router.post('/upload', uploadMiddleware.single('image'), uploadImage);

router.get('/services', servicesController.listServices);
router.get('/services/:id', servicesController.getService);
router.post('/services', servicesController.createService);
router.put('/services/:id', servicesController.updateService);
router.delete('/services/:id', servicesController.deleteService);

router.get('/projects', projectsController.listProjects);
router.get('/projects/:id', projectsController.getProject);
router.post('/projects', projectsController.createProject);
router.put('/projects/:id', projectsController.updateProject);
router.delete('/projects/:id', projectsController.deleteProject);

router.get('/blog', blogController.listBlogPosts);
router.get('/blog/:id', blogController.getBlogPost);
router.post('/blog', blogController.createBlogPost);
router.put('/blog/:id', blogController.updateBlogPost);
router.delete('/blog/:id', blogController.deleteBlogPost);

router.get('/testimonials', testimonialsController.listTestimonials);
router.get('/testimonials/:id', testimonialsController.getTestimonial);
router.post('/testimonials', testimonialsController.createTestimonial);
router.put('/testimonials/:id', testimonialsController.updateTestimonial);
router.delete('/testimonials/:id', testimonialsController.deleteTestimonial);

router.get('/inquiries', inquiriesController.listInquiries);
router.get('/inquiries/:id', inquiriesController.getInquiry);
router.patch('/inquiries/:id/status', inquiriesController.updateInquiryStatus);

router.get('/faq', faqController.listFaqItems);
router.get('/faq/:id', faqController.getFaqItem);
router.post('/faq', faqController.createFaqItem);
router.put('/faq/:id', faqController.updateFaqItem);
router.delete('/faq/:id', faqController.deleteFaqItem);

export default router;
