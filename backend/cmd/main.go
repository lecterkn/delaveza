package main

import (
	"net/http/httputil"
	"net/url"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/lecterkn/delaveza/backend/handler"
)

func main() {
	e := echo.New()
	// ロガー
	e.Use(middleware.Logger())
	// フロントエンド
	e.Static("/", "./frontend/dist")
	// プロキシ
	api := e.Group("/api")
	api.POST("/entitlements", handler.PostEntitlement)
	api.GET("/userinfo", handler.GetUserInfo)
	api.GET("/storefront", handler.GetStorefront)

	e.Logger.Fatal(e.Start(":8911"))
}

func registerEntitlementProxy(e *echo.Echo) error {
	target, err := url.Parse("https://auth.riotgames.com/")
	if err != nil {
		return err
	}
	proxy := httputil.NewSingleHostReverseProxy(target)
	e.Group("/api").Any("/proxy/riot/auth/*", echo.WrapHandler(proxy))
	return nil
}
