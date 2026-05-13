"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, FileText, Split } from "lucide-react"

export function DownloadButtons() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleSinglePageDownload = async () => {
    setIsDownloading(true)
    try {
      const container = document.querySelector("#resume-content") as HTMLElement | null
      if (!container) throw new Error("Resume container not found")

      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      // Clone container for manipulation
      const clone = container.cloneNode(true) as HTMLElement

      // Fix SVG icons
      const icons = clone.querySelectorAll("svg")
      await Promise.all(
        Array.from(icons).map(async (icon) => {
          const serializer = new XMLSerializer()
          const svgString = serializer.serializeToString(icon)
          const svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)))

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

      // Fix flex containers
      const flexContainers = clone.querySelectorAll('[class*="flex items-center"]')
      flexContainers.forEach(container => {
        const element = container as HTMLElement
        element.style.display = "inline-flex"
        element.style.alignItems = "center"
        element.style.gap = "4px"
      })

      // Create wrapper for single page rendering
      const wrapper = document.createElement("div")
      wrapper.style.position = "fixed"
      wrapper.style.top = "-9999px"
      wrapper.style.width = "800px" // Wider for single page
      wrapper.style.backgroundColor = "white"
      wrapper.style.padding = "20px"
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      // Capture with higher scale for better quality
      const canvas = await html2canvas(clone, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        width: 800,
        height: clone.scrollHeight
      })

      document.body.removeChild(wrapper)

      const imgData = canvas.toDataURL("image/png", 0.95)
      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
        orientation: "portrait",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

      // If content fits on one page, center it
      if (imgHeight * ratio <= pdfHeight) {
        const imgScaledWidth = imgWidth * ratio
        const imgScaledHeight = imgHeight * ratio
        const marginX = (pdfWidth - imgScaledWidth) / 2
        const marginY = (pdfHeight - imgScaledHeight) / 2

        pdf.addImage(imgData, "PNG", marginX, marginY, imgScaledWidth, imgScaledHeight)
      } else {
        // If content is too tall, scale it down to fit
        const scale = pdfHeight / imgHeight
        const imgScaledWidth = imgWidth * scale
        const imgScaledHeight = imgHeight * scale
        const marginX = Math.max(0, (pdfWidth - imgScaledWidth) / 2)

        pdf.addImage(imgData, "PNG", marginX, 0, imgScaledWidth, imgScaledHeight)
      }

      pdf.save("Prasanna_Bhattarai_Resume_SinglePage.pdf")
    } catch (err) {
      console.error("Single page download failed:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      alert(`Single page download failed: ${errorMessage}. Please try again.`)
    } finally {
      setTimeout(() => setIsDownloading(false), 500)
    }
  }

  const handleMultiPageDownload = async () => {
    setIsDownloading(true)
    try {
      const container = document.querySelector("#resume-content") as HTMLElement | null
      if (!container) throw new Error("Resume container not found")

      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      // Clone container for manipulation
      const clone = container.cloneNode(true) as HTMLElement

      // Fix SVG icons
      const icons = clone.querySelectorAll("svg")
      await Promise.all(
        Array.from(icons).map(async (icon) => {
          const serializer = new XMLSerializer()
          const svgString = serializer.serializeToString(icon)
          const svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)))

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

      // Fix flex containers
      const flexContainers = clone.querySelectorAll('[class*="flex items-center"]')
      flexContainers.forEach(container => {
        const element = container as HTMLElement
        element.style.display = "inline-flex"
        element.style.alignItems = "center"
        element.style.gap = "4px"
      })

      // Split content into sections for multi-page PDF
      const sections = clone.querySelectorAll("section")
      const header = clone.querySelector("header")

      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
        orientation: "portrait",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const margin = 40
      const contentWidth = pdfWidth - (margin * 2)
      const contentHeight = pdfHeight - (margin * 2)
      const renderWidth = container.getBoundingClientRect().width

      let currentY = margin
      let pageNum = 1

      // Function to add page number
      const addPageNumber = (page: number) => {
        pdf.setFontSize(10)
        pdf.setTextColor(128, 128, 128)
        pdf.text(`Page ${page}`, pdfWidth - margin, pdfHeight - 20, { align: "right" })
      }

      // Function to add bottom border
      const addBottomBorder = () => {
        pdf.setDrawColor(200, 200, 200)
        pdf.setLineWidth(0.5)
        pdf.line(margin, pdfHeight - 30, pdfWidth - margin, pdfHeight - 30)
      }

      // Add header to first page
      if (header) {
        const wrapper = document.createElement("div")
        wrapper.style.position = "fixed"
        wrapper.style.top = "-9999px"
        wrapper.style.width = `${renderWidth}px`
        wrapper.style.backgroundColor = "white"
        wrapper.style.padding = "0"
        wrapper.appendChild(header.cloneNode(true))
        document.body.appendChild(wrapper)

        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: renderWidth,
        })

        document.body.removeChild(wrapper)

        const imgData = canvas.toDataURL("image/png")
        const imgHeight = (canvas.height * contentWidth) / canvas.width

        if (currentY + imgHeight > pdfHeight - margin - 50) {
          addBottomBorder()
          addPageNumber(pageNum)
          pdf.addPage()
          pageNum++
          currentY = margin
        }

        pdf.addImage(imgData, "PNG", margin, currentY, contentWidth, imgHeight)
        currentY += imgHeight + 20
      }

      // Process each section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const sectionClone = section.cloneNode(true) as HTMLElement

        // Add page break before major sections (except first)
        if (i > 0 && (section.querySelector("h2")?.textContent?.includes("PROFESSIONAL EXPERIENCE") ||
                     section.querySelector("h2")?.textContent?.includes("PRODUCTS DEVELOPED"))) {
          addBottomBorder()
          addPageNumber(pageNum)
          pdf.addPage()
          pageNum++
          currentY = margin
        }

        const wrapper = document.createElement("div")
        wrapper.style.position = "fixed"
        wrapper.style.top = "-9999px"
        wrapper.style.width = `${renderWidth}px`
        wrapper.style.backgroundColor = "white"
        wrapper.style.padding = "0"
        wrapper.appendChild(sectionClone)
        document.body.appendChild(wrapper)

        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: renderWidth,
        })

        document.body.removeChild(wrapper)

        const imgData = canvas.toDataURL("image/png")
        const imgHeight = (canvas.height * contentWidth) / canvas.width

        // Check if section fits on current page
        if (currentY + imgHeight > pdfHeight - margin - 50) {
          // If section is too tall for a single page, split it
          if (imgHeight > contentHeight - 50) {
            // Split large sections
            const splitHeight = contentHeight - 50
            const splitRatio = splitHeight / imgHeight

            // First part of section
            const firstPartCanvas = document.createElement("canvas")
            const firstPartCtx = firstPartCanvas.getContext("2d")!
            firstPartCanvas.width = canvas.width
            firstPartCanvas.height = splitHeight * (canvas.height / imgHeight)

            const tempImg = new Image()
            tempImg.src = imgData
            await new Promise(resolve => tempImg.onload = resolve)

            firstPartCtx.drawImage(tempImg, 0, 0, canvas.width, firstPartCanvas.height, 0, 0, canvas.width, firstPartCanvas.height)
            const firstPartData = firstPartCanvas.toDataURL("image/png")

            pdf.addImage(firstPartData, "PNG", margin, currentY, contentWidth, splitHeight)
            addBottomBorder()
            addPageNumber(pageNum)
            pdf.addPage()
            pageNum++
            currentY = margin

            // Second part of section
            const secondPartCanvas = document.createElement("canvas")
            const secondPartCtx = secondPartCanvas.getContext("2d")!
            secondPartCanvas.width = canvas.width
            secondPartCanvas.height = canvas.height - firstPartCanvas.height

            secondPartCtx.drawImage(tempImg, 0, firstPartCanvas.height, canvas.width, secondPartCanvas.height, 0, 0, canvas.width, secondPartCanvas.height)
            const secondPartData = secondPartCanvas.toDataURL("image/png")

            const secondPartHeight = (secondPartCanvas.height * contentWidth) / canvas.width
            pdf.addImage(secondPartData, "PNG", margin, currentY, contentWidth, secondPartHeight)
            currentY += secondPartHeight + 20
          } else {
            // Section fits on next page
            addBottomBorder()
            addPageNumber(pageNum)
            pdf.addPage()
            pageNum++
            currentY = margin
            pdf.addImage(imgData, "PNG", margin, currentY, contentWidth, imgHeight)
            currentY += imgHeight + 20
          }
        } else {
          // Section fits on current page
          pdf.addImage(imgData, "PNG", margin, currentY, contentWidth, imgHeight)
          currentY += imgHeight + 20
        }
      }

      // Add page number to last page
      addBottomBorder()
      addPageNumber(pageNum)

      pdf.save("Prasanna_Bhattarai_Resume_MultiPage.pdf")
    } catch (err) {
      console.error("Multi-page download failed:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      alert(`Multi-page download failed: ${errorMessage}. Please try again.`)
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
        title="Download Multi-Page PDF"
      >
        <Split className="h-4 w-4" />
      </Button>
    </div>
  )
}