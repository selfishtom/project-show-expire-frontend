import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";

interface UserInfo {
  id: number;
  inboundId: number;
  enable: boolean;
  email: string;
  up: number;
  down: number;
  allTime: number;
  expiryTime: number;
  total: number;
  reset: number;
  status: "active" | "expired";
  timeUntilEnd?: string;
}

interface SearchResponse {
  success: boolean;
  msg: string;
  obj: UserInfo | null;
}

export const Search: React.FC = () => {
  const [userCode, setUserCode] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();

  const handleSearch = async () => {
    if (!userCode.trim()) {
      setError(t("pleaseEnterCode"));
      return;
    }

    setLoading(true);
    setError(null);
    setUserInfo(null);

    try {
      const response = await axios.get<SearchResponse>(
        `${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(
          userCode
        )}`
      );
      if (response.data.success && response.data.obj) {
        setUserInfo(response.data.obj);
      } else {
        setError(t("noUserFound"));
      }
    } catch (err: any) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.code === "ERR_NETWORK") {
        setError(t("networkError"));
      } else {
        setError(t("connectionError"));
      }
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} ${language === "fa" ? "گیگ" : "GB"}`;
  };

  return (
    <div className="p-6">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder={t("searchPlaceholder")}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="input input-bordered w-full mb-2"
            disabled={loading}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              t("searchButton")
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {userInfo && (
        <>
          <div className="divider my-6"></div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base-content font-medium">
                {t("status")}:
              </span>
              <span
                className={`font-bold ${
                  userInfo.enable === true ? "text-success" : "text-error"
                }`}
              >
                {t(userInfo.status)}
              </span>
            </div>
            {userInfo.enable === true && userInfo.timeUntilEnd && (
              <div className="flex justify-between items-center">
                <span className="text-base-content font-medium">
                  {t("timeUntilEnd")}:
                </span>
                <span className="font-bold text-primary">
                  {userInfo.timeUntilEnd}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-base-content font-medium">
                {t("usage")}:
              </span>
              <span className="font-bold text-primary">
                {formatBytes(userInfo.up + userInfo.down)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base-content font-medium">
                {t("remain")}:
              </span>
              <span className="font-bold text-primary">
                {userInfo.total === 0
                  ? t("unlimited")
                  : formatBytes(userInfo.total - (userInfo.up + userInfo.down))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base-content font-medium">
                {t("total")}:
              </span>
              <span className="font-bold text-primary">
                {userInfo.total === 0
                  ? t("unlimited")
                  : formatBytes(userInfo.total)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
