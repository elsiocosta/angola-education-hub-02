
import React from 'react';
import Layout from '@/components/Layout';
import InstitutionRegisterForm from '@/components/InstitutionRegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-lg">
          <InstitutionRegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
