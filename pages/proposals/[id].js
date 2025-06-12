import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher, api } from '../../lib/api';
import ProposalEditor from '../../components/ProposalEditor';
import VersionDrawer from '../../components/VersionDrawer';
import Modal from '../../components/Modal';
import { useToast } from '../../hooks/useToast';
import { 
  DocumentIcon, 
  ClockIcon, 
  PaperAirplaneIcon,
  ArchiveBoxIcon 
} from '@heroicons/react/24/outline';

export default function ProposalEditorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToast } = useToast();
  
  const [content, setContent] = useState('');
  const [showVersions, setShowVersions] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: proposal, error, mutate } = useSWR(
    id ? `/api/proposals/${id}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data && content === '') {
          setContent(data.content || '');
        }
      }
    }
  );

  const { data: versions } = useSWR(
    id ? `/api/versions/${id}` : null,
    fetcher
  );

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      await api('/api/saveDraft', {
        method: 'POST',
        body: { proposalId: id, content }
      });
      addToast('Draft saved successfully!', 'success');
      mutate();
    } catch (error) {
      addToast('Failed to save draft', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const result = await api('/api/submitProposal', {
        method: 'POST',
        body: { proposalId: id }
      });
      addToast(`Proposal submitted! Transaction ID: ${result.txId}`, 'success');
      setShowSubmitModal(false);
      router.push('/reputation');
    } catch (error) {
      addToast('Failed to submit proposal', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVersionSelect = (version) => {
    setContent(version.content);
    addToast('Version restored', 'success');
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Failed to load proposal. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="skeleton h-8 w-1/2"></div>
          <div className="skeleton h-96 w-full"></div>
        </div>
      </div>
    );
  }

  const isSubmitted = proposal.status === 'submitted';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Proposal for {proposal.tenderTitle}
          </h1>
          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isSubmitted 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isSubmitted ? 'Submitted' : 'Draft'}
            </span>
          </div>
        </div>

        {!isSubmitted && (
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="btn btn-secondary"
            >
              <DocumentIcon className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              onClick={() => setShowVersions(true)}
              className="btn btn-secondary"
            >
              <ClockIcon className="h-4 w-4 mr-2" />
              Version History
            </button>
            
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn btn-primary"
            >
              <PaperAirplaneIcon className="h-4 w-4 mr-2" />
              Submit Proposal
            </button>
          </div>
        )}
      </div>

      <ProposalEditor
        content={content}
        onChange={setContent}
        readOnly={isSubmitted}
      />

      <VersionDrawer
        isOpen={showVersions}
        onClose={() => setShowVersions(false)}
        versions={versions || []}
        onSelectVersion={handleVersionSelect}
      />

      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Proposal"
      >
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
            <ArchiveBoxIcon className="h-5 w-5 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Record proof on Algorand blockchain
              </p>
              <p className="text-sm text-yellow-700">
                This will lock your proposal and create an immutable proof of submission.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Submitting...' : 'Confirm Submit'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}