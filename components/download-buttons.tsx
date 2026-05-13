"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Split } from "lucide-react"

export function DownloadButtons() {
  const [isDownloading, setIsDownloading] = useState(false)

  const fixSvgIcons = async (clone: HTMLElement) => {
    const icons = clone.querySelectorAll("svg")
    await Promise.all(
      Array.from(icons).map(async (icon) => {
        const serializer = new XMLSerializer()
        const svgString = serializer.serializeToString(icon)
        const svgBase64 =
          "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgString)))
        const img = document.createElement("img")
        img.src = svgBase64
        img.width = icon.clientWidth || 16
        img.height = icon.clientHeight || 16
        img.style.display = "inline-block"
        img.style.verticalAlign = "middle"
        img.style.marginRight = "4px"
        img.style.marginBottom = "2px"
        icon.replaceWith(img)
      })
    )
  }

  // ─── Single-page download ────────────────────────────────────────────────────
  const handleSinglePageDownload = async () => {
    setIsDownloading(true)
    try {
      const container = document.querySelector("#resume-content") as HTMLElement | null
      if (!container) throw new Error("Resume container not found")

      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      const clone = container.cloneNode(true) as HTMLElement
      await fixSvgIcons(clone)

      const wrapper = document.createElement("div")
      wrapper.style.cssText = `
        position: fixed; top: -99999px; left: 0;
        width: 800px; background: white; padding: 20px;
      `
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      const canvas = await html2canvas(clone, {
        scale: 2, useCORS: true, logging: false,
        width: 800, height: clone.scrollHeight,
      })
      document.body.removeChild(wrapper)

      const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" })
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()
      const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height)
      const scaledW = canvas.width * ratio
      const scaledH = canvas.height * ratio
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        (pdfW - scaledW) / 2,
        scaledH < pdfH ? (pdfH - scaledH) / 2 : 0,
        scaledW, scaledH
      )
      pdf.save("Prasanna_Bhattarai_Resume_SinglePage.pdf")
    } catch (err) {
      console.error(err)
      alert("Single-page download failed. Please try again.")
    } finally {
      setTimeout(() => setIsDownloading(false), 500)
    }
  }

  // ─── Two-page download ───────────────────────────────────────────────────────
  const handleMultiPageDownload = async () => {
    setIsDownloading(true)
    try {
      const container = document.querySelector("#resume-content") as HTMLElement | null
      if (!container) throw new Error("Resume container not found")

      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" })
      const pdfW = pdf.internal.pageSize.getWidth()   // 595.28
      const pdfH = pdf.internal.pageSize.getHeight()  // 841.89

      const MARGIN_PT = 20
      const CONTENT_W_PT = pdfW - MARGIN_PT * 2
      const CONTENT_H_PT = pdfH - MARGIN_PT * 2
      const RENDER_PX = 900
      const SCALE = 2

      // --- Collect blocks (header + sections) ---
      const clone = container.cloneNode(true) as HTMLElement
      await fixSvgIcons(clone)

      const header = clone.querySelector("header")
      const sections = Array.from(clone.querySelectorAll("section"))
      const rawBlocks: HTMLElement[] = []
      if (header) rawBlocks.push(header as HTMLElement)
      rawBlocks.push(...(sections as HTMLElement[]))

      // --- Render each block, measure its PDF height ---
      type RenderedBlock = { imgData: string; ptH: number }
      const blocks: RenderedBlock[] = []

      for (const block of rawBlocks) {
        const el = block.cloneNode(true) as HTMLElement
        const wrapper = document.createElement("div")
        wrapper.style.cssText = `
          position: fixed; top: -99999px; left: 0;
          width: ${RENDER_PX}px; background: white;
          padding: 0; margin: 0;
        `
        wrapper.appendChild(el)
        document.body.appendChild(wrapper)

        const canvas = await html2canvas(wrapper, {
          scale: SCALE, useCORS: true, logging: false,
          width: RENDER_PX,
        })
        document.body.removeChild(wrapper)

        // canvas.height / SCALE = logical px height; scale to PDF content width
        const ptH = (canvas.height / SCALE / RENDER_PX) * CONTENT_W_PT
        blocks.push({ imgData: canvas.toDataURL("image/png"), ptH })
      }

      const GAP_PT = 8
      const naturalSum = blocks.reduce((s, b) => s + b.ptH, 0)
      const totalGaps = GAP_PT * (blocks.length - 1)

      // Scale so all content fits in exactly 2 pages
      const twoPageUsable = CONTENT_H_PT * 2 - totalGaps
      const globalScale = naturalSum > twoPageUsable ? twoPageUsable / naturalSum : 1

      const scaledBlocks = blocks.map(b => ({ ...b, ptH: b.ptH * globalScale }))

      // --- Greedy fill: pack page 1 as full as possible without splitting a section ---
      let p1End = 0
      let p1Used = 0
      for (let i = 0; i < scaledBlocks.length; i++) {
        const addH = scaledBlocks[i].ptH + (i > 0 ? GAP_PT : 0)
        if (p1Used + addH > CONTENT_H_PT && i > 0) {
          p1End = i
          break
        }
        p1Used += addH
        p1End = i + 1
      }

      // If all blocks fit on page 1 somehow, split at midpoint
      if (p1End === scaledBlocks.length) {
        p1End = Math.ceil(scaledBlocks.length / 2)
      }

      // --- Draw pages ---
      const drawPage = (pageIdx: number, from: number, to: number) => {
        if (pageIdx > 0) pdf.addPage()
        let y = MARGIN_PT
        for (let i = from; i < to; i++) {
          const b = scaledBlocks[i]
          pdf.addImage(b.imgData, "PNG", MARGIN_PT, y, CONTENT_W_PT, b.ptH)
          y += b.ptH + GAP_PT
        }
        // Footer
        pdf.setDrawColor(220, 220, 220)
        pdf.setLineWidth(0.5)
        pdf.line(MARGIN_PT, pdfH - 18, pdfW - MARGIN_PT, pdfH - 18)
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text(`${pageIdx + 1} / 2`, pdfW - MARGIN_PT, pdfH - 7, { align: "right" })
      }

      drawPage(0, 0, p1End)
      drawPage(1, p1End, scaledBlocks.length)

      pdf.save("Prasanna_Bhattarai_Resume_2Page.pdf")
    } catch (err) {
      console.error(err)
      alert("Two-page download failed. Please try again.")
    } finally {
      setTimeout(() => setIsDownloading(false), 500)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2 print:hidden">
      <Button
        onClick={handleSinglePageDownload}
        className="rounded-full p-3 shadow-lg hover:shadow-xl active:scale-95 transition-transform bg-blue-600 hover:bg-blue-700"
        disabled={isDownloading}
        title="Download Single Page PDF"
      >
        <FileText className="h-4 w-4" />
      </Button>
      <Button
        onClick={handleMultiPageDownload}
        className="rounded-full p-3 shadow-lg hover:shadow-xl active:scale-95 transition-transform bg-green-600 hover:bg-green-700"
        disabled={isDownloading}
        title="Download 2-Page PDF"
      >
        <Split className="h-4 w-4" />
      </Button>
    </div>
  )
}