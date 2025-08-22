import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Grid,
  Chip,
  Button,
  Link as MuiLink,
  Box,
  CardActionArea
} from '@mui/material';

const Certifications = () => {
  const certs = [
    {
      title: 'Front End Development Libraries',
      issuer: 'freeCodeCamp',
      issued: 'Feb 2025',
      skills: ['React.js', 'JavaScript'],
      link: 'https://www.freecodecamp.org/certification/stefanustitan/front-end-development-libraries',
    },
    {
      title: 'Machine Learning with Python',
      issuer: 'freeCodeCamp',
      issued: 'Feb 2025',
      skills: ['Analytical Skills', 'scikit-learn', 'Python', 'TensorFlow'],
      link: 'https://www.freecodecamp.org/certification/stefanustitan/machine-learning-with-python-v7',
    },
    {
      title: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
      issuer: 'Amazon Web Services (AWS)',
      issued: 'Jun 2024',
      skills: ['Cloud Fundamentals', 'AWS Services', 'Cloud Architecture'],
      link: 'https://www.credly.com/badges/451fb210-8f07-410b-b5ac-202ad043ba38/linked_in_profile',
    },
    {
      title: 'SAP S/4 HANA Configuration',
      issuer: 'SAP University Alliance Program at ITHB Career Resource Center',
      issued: 'May 2024',
      skills: ['SAP S/4HANA', 'Configuration', 'ERP'],
    },
    {
      title: 'Certiplus Program',
      issuer: 'ITHB Career Resource Center',
      issued: 'Dec 2023',
      description:
        'Completed a series of professional training in computer, communication, leadership, entrepreneurship, and career planning skills.',
      skills: ['Communication', 'Leadership', 'Entrepreneurship', 'Career Planning'],
    },
    {
      title: 'SAP Introduction to S/4HANA using Global Bike',
      issuer: 'SAP University Alliance Program at ITHB Career Resource Center',
      issued: 'Nov 2023',
      skills: ['SAP S/4HANA', 'Business Processes'],
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Certifications | Stefanus Titan</title>
        <meta name="description" content="Certifications and courses completed by Stefanus Titan" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Certifications</h1>
        <p className={styles.description}>Selected certificates and courses I have completed.</p>

        <section>
          <Grid container spacing={3} justifyContent="flex-start">
            {certs.map((c, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ width: 320, maxWidth: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--card-bg)' }}>
                  
                  <CardHeader
                    title={
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'var(--text)' }}>
                        {c.title}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" component="div" sx={{ color: 'var(--text-secondary)' }}>
                        {c.issuer}
                      </Typography>
                    }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'var(--text-secondary)' }}>
                      {c.issued}
                    </Typography>
                    {c.description && (
                      <Typography variant="body2" sx={{ mb: 1, color: 'var(--text)' }}>
                        {c.description}
                      </Typography>
                    )}

                    {c.skills && c.skills.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {c.skills.map((s, i) => (
                          <Chip
                            key={i}
                            label={s}
                            variant="outlined"
                            size="small"
                            sx={{ color: 'var(--text-secondary)' }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                  {c.link ? (
                    <CardActions>
                      <MuiLink href={c.link} target="_blank" rel="noopener noreferrer" underline="none">
                        <Button size="small" color="primary" variant="contained" sx={{ textTransform: 'none' }}>
                          View Certificate
                        </Button>
                      </MuiLink>
                    </CardActions>
                  ) : null}
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </main>
    </div>
  );
};

export default Certifications;
