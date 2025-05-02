package handler

import (
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

func PostEntitlement(c echo.Context) error {
	// 外部リクエストを作成
	req, err := http.NewRequest("POST", "https://entitlements.auth.riotgames.com/api/token/v1", nil)
	if err != nil {
		return c.String(http.StatusInternalServerError, "リクエストの作成に失敗しました")
	}

	// 元のリクエストのヘッダーをコピー（必要に応じて調整）
	req.Header.Set("Authorization", c.Request().Header.Get("Authorization"))
	req.Header.Set("Content-Type", "application/json")

	// HTTPクライアントでリクエストを送信
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return c.String(http.StatusBadGateway, "外部APIへの接続に失敗しました")
	}
	defer resp.Body.Close()

	// レスポンスボディを文字列で取得
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	bodyString := string(bodyBytes)

	// 外部レスポンスをそのままクライアントへ返す
	c.Response().Header().Add("Content-Type", "application/json")
	return c.String(resp.StatusCode, bodyString)
}

func GetUserInfo(c echo.Context) error {
	// 外部リクエストを作成
	req, err := http.NewRequest("GET", "https://auth.riotgames.com/userinfo", nil)
	if err != nil {
		return c.String(http.StatusInternalServerError, "リクエストの作成に失敗しました")
	}

	// 元のリクエストのヘッダーをコピー（必要に応じて調整）
	req.Header.Set("Authorization", c.Request().Header.Get("Authorization"))

	// HTTPクライアントでリクエストを送信
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return c.String(http.StatusBadGateway, "外部APIへの接続に失敗しました")
	}
	defer resp.Body.Close()

	// レスポンスボディを文字列で取得
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	bodyString := string(bodyBytes)

	// 外部レスポンスをそのままクライアントへ返す
	c.Response().Header().Add("Content-Type", "application/json")
	return c.String(resp.StatusCode, bodyString)
}
