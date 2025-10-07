import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function VideoDownloader() {
  return (
    <>
      <Helmet>
        <title>Video Downloader - GinyWow</title>
        <meta name="description" content="Download videos from various platforms with our free video downloader tool." />
        <meta property="og:title" content="Video Downloader - GinyWow" />
        <meta property="og:description" content="Download videos from various platforms with our free video downloader tool." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Video Downloader
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Download videos from various platforms quickly and easily
            </p>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We're working on bringing you a powerful video downloader tool. 
                This feature will allow you to download videos from popular platforms.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
                  <p className="text-sm text-gray-600">Download in various video formats and qualities</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fast Downloads</h3>
                  <p className="text-sm text-gray-600">High-speed downloads with optimized servers</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
                  <p className="text-sm text-gray-600">Your downloads are secure and private</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600">
                Follow us on social media to be notified when this feature launches!
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
