import { css } from "@emotion/react";
import { useState, useEffect, useRef, useContext } from "react";
import { LanguageContext } from "@services/getInitialData";
import { useSubmitQuizRanking } from "@hooks/queries";

interface SubmitModalProps {
  quizId: number;
  score: number;
  timeSeconds: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const SubmitModal = ({
  quizId,
  score,
  timeSeconds,
  isOpen,
  onClose,
  onSubmitSuccess,
}: SubmitModalProps) => {
  const { text } = useContext(LanguageContext);
  const t = text.QUIZ.RESULT_SUBMIT;
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const mutation = useSubmitQuizRanking(quizId);

  const trimmed = username.trim();
  const isValid = trimmed.length >= 1 && trimmed.length <= 20;
  const showValidation = username.length > 0 && !isValid;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !mutation.isPending && !showSuccess) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, mutation.isPending, showSuccess, onClose]);

  const handleSubmit = () => {
    if (!isValid || mutation.isPending) return;
    mutation.mutate(
      { username: trimmed, score, timeSeconds },
      {
        onSuccess: () => {
          onSubmitSuccess();
          setShowSuccess(true);
          setTimeout(() => {
            onClose();
          }, 1000);
        },
      }
    );
  };

  const handleRetry = () => {
    mutation.reset();
  };

  const handleBackdropClick = () => {
    if (!mutation.isPending && !showSuccess) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const titleId = "submit-modal-title";

  return (
    <div css={overlay} onClick={handleBackdropClick}>
      <div
        css={modal}
        role="dialog"
        aria-labelledby={titleId}
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div css={header}>
          <h3 id={titleId} css={title}>
            {t.MODAL_TITLE}
          </h3>
          {!mutation.isPending && !showSuccess && (
            <button
              css={closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          )}
        </div>

        {showSuccess ? (
          <div css={statusContainer}>
            <span css={successText}>{t.SUCCESS}</span>
          </div>
        ) : mutation.isError ? (
          <div css={body}>
            <div css={statusContainer}>
              <span css={errorText}>{t.ERROR}</span>
              <button css={retryButton} onClick={handleRetry}>
                {t.RETRY}
              </button>
            </div>
          </div>
        ) : (
          <div css={body}>
            <input
              ref={inputRef}
              css={input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.ID_PLACEHOLDER}
              maxLength={20}
              disabled={mutation.isPending}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            {showValidation && (
              <span css={validationText}>{t.VALIDATION_LENGTH}</span>
            )}
          </div>
        )}

        {!showSuccess && !mutation.isError && (
          <div css={footer}>
            <button
              css={submitButton}
              onClick={handleSubmit}
              disabled={!isValid || mutation.isPending}
            >
              {mutation.isPending ? (
                <span css={spinnerSmall} />
              ) : (
                t.BUTTON
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const modal = css`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  text-align: center;
`;

const header = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const title = css`
  font-size: var(--fontLarge);
  color: var(--text);
  margin: 0;
`;

const closeButton = css`
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text);
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const body = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const input = css`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--primary);
  color: var(--text);
  font-size: var(--fontMedium);
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: var(--point);
  }

  &:disabled {
    opacity: 0.6;
  }

  &::placeholder {
    color: var(--text);
    opacity: 0.4;
  }
`;

const validationText = css`
  font-size: var(--fontSmall);
  color: #e74c3c;
  text-align: center;
`;

const statusContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
`;

const successText = css`
  font-size: var(--fontLarge);
  color: var(--point);
  font-weight: bold;
`;

const errorText = css`
  font-size: var(--fontMedium);
  color: #e74c3c;
  text-align: center;
`;

const footer = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const submitButton = css`
  min-width: 100px;
  height: 42px;
  border-radius: 8px;
  border: none;
  background: var(--point);
  color: var(--background);
  font-size: var(--fontMedium);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const retryButton = css`
  padding: 8px 20px;
  font-size: var(--fontSmall);
  color: var(--background);
  background-color: var(--point);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const spinnerSmall = css`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid var(--background);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default SubmitModal;
