import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const productLinks = [
    { name: 'Product', href: '#' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Live Demo', href: '#' },
    { name: 'Case Studies', href: '#' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'in' },
    { name: 'Twitter', icon: 'tw' },
    { name: 'Instagram', icon: 'ig' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-logo">AITELZ</div>
          <p className="footer-description">
            Conversational AI agents for businesses. Call automation, bookings, and always-on customer service. No more human staffing.
          </p>
          <p className="footer-copyright">
            © 2024 AITELZ.com All rights reserved.
          </p>
        </motion.div>

        {/* Links Section */}
        <div className="footer-links-wrapper">
          <motion.div
            className="footer-link-group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4>Product</h4>
            <ul>
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-link-group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4>Company</h4>
            <ul>
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter & Social Section */}
        <motion.div
          className="footer-newsletter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4>Stay Updated</h4>
          <p>Join our newsletter for the latest AI updates.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>

          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className="social-icon"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Simple text representation for now, or actual icons if available */}
                {social.name.substring(0, 2)}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

