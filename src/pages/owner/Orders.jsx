"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, Search, User, ChevronDown } from "lucide-react"
import "./Orders.css"

export default function Orders() {
  // State management for orders and UI
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [updatingStatus, setUpdatingStatus] = useState({})
  const [openDropdown, setOpenDropdown] = useState(null)

  // Restaurant ID - in real app, this would come from context or props
  const restaurantId = "restaurant-123"

  // Status configuration with colors - updated to match schema
  const statusConfig = {
    pending: { label: "Pending", color: "status-pending", textColor: "text-pending" },
    preparing: { label: "Preparing", color: "status-preparing", textColor: "text-preparing" },
    delivering: { label: "Delivering", color: "status-delivering", textColor: "text-delivering" },
    completed: { label: "Completed", color: "status-completed", textColor: "text-completed" },
    cancelled: { label: "Cancelled", color: "status-cancelled", textColor: "text-cancelled" },
  }

  // Mock data matching the Mongoose schema format
  const mockOrders = [
    {
      _id: "64f8a1b2c3d4e5f6a7b8c9d0",
      user: {
        _id: "64f8a1b2c3d4e5f6a7b8c9d1",
        name: "Febin Fathima",
        phone: "9876543210",
        email: "febinfathima07@gmail.com",
      },
      deliveryAddress: {
        BuildingName: "Pink House",
        street: "Kochukannankara Nadackal P O Erattupetta",
        city: "Kottayam",
        pincode: "686121",
      },
      items: [
        {
          food: {
            _id: "64f8a1b2c3d4e5f6a7b8c9da",
            name: "Beef Mandhi",
            price: 300,
          },
          quantity: 1,
          price: 300,
        },
      ],
      totalPrice: 300,
      status: "pending",
      orderedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      deliveryTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      _id: "64f8a1b2c3d4e5f6a7b8c9d4",
      user: {
        _id: "64f8a1b2c3d4e5f6a7b8c9d5",
        name: "Farzeen Firoz",
        phone: "9123456789",
        email: "farzeenfiroz@gmail.com",
      },
      deliveryAddress: {
        BuildingName: "Green Villa",
        street: "Mundakayam Kanjirappally",
        city: "Kottayam",
        pincode: "686507",
      },
      items: [
        {
          food: {
            _id: "64f8a1b2c3d4e5f6a7b8c9d6",
            name: "Chicken Biryani",
            price: 250,
          },
          quantity: 2,
          price: 250,
        },
        {
          food: {
            _id: "64f8a1b2c3d4e5f6a7b8c9d7",
            name: "Raita",
            price: 50,
          },
          quantity: 1,
          price: 50,
        },
      ],
      totalPrice: 550,
      status: "preparing",
      orderedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      deliveryTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      createdAt: new Date(Date.now() - 45 * 60 * 1000),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      _id: "64f8a1b2c3d4e5f6a7b8c9d9",
      user: {
        _id: "64f8a1b2c3d4e5f6a7b8c9d1",
        name: "Febin Fathima",
        phone: "9876543210",
        email: "febinfathima07@gmail.com",
      },
      deliveryAddress: {
        BuildingName: "Pink House",
        street: "Kochukannankara Nadackal P O Erattupetta",
        city: "Kottayam",
        pincode: "686121",
      },
      items: [
        {
          food: {
            _id: "64f8a1b2c3d4e5f6a7b8c9da",
            name: "Beef Mandhi",
            price: 300,
          },
          quantity: 1,
          price: 300,
        },
      ],
      totalPrice: 300,
      status: "delivering",
      orderedAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      deliveryTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      _id: "64f8a1b2c3d4e5f6a7b8c9dc",
      user: {
        _id: "64f8a1b2c3d4e5f6a7b8c9d5",
        name: "Farzeen Firoz",
        phone: "9123456789",
        email: "farzeenfiroz@gmail.com",
      },
      deliveryAddress: {
        BuildingName: "Green Villa",
        street: "Mundakayam Kanjirappally",
        city: "Kottayam",
        pincode: "686507",
      },
      items: [
        {
          food: {
            _id: "64f8a1b2c3d4e5f6a7b8c9dd",
            name: "Fish Curry",
            price: 180,
          },
          quantity: 1,
          price: 180,
        },
        {
          food: {
            _id: "64f8a1b2c3d4e5f6a7b8c9de",
            name: "Rice",
            price: 40,
          },
          quantity: 2,
          price: 40,
        },
      ],
      totalPrice: 260,
      status: "completed",
      orderedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      deliveryTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago (delivered)
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]

  // Fetch orders from API
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)

    // Set up auto-refresh every 30 seconds (optional for mock data)
    const interval = setInterval(() => {
      // Could refresh mock data here if needed
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Update order status with working API call
  const handleStatusUpdate = async (orderId, newStatus) => {
    const previousOrders = [...orders] // Store previous state for rollback
    try {
      // Set loading state for this specific order
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: true }))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update the order status in mock data
      setOrders((prev) =>
          prev.map((order) =>
              order._id === orderId || order.id === orderId
                  ? { ...order, status: newStatus, updatedAt: new Date() }
                  : order,
          ),
      )

      // Close dropdown
      setOpenDropdown(null)

      // Show success message
      console.log(`Order ${orderId} status changed to ${statusConfig[newStatus].label}`)
    } catch (err) {
      // Rollback optimistic update on error
      setOrders(previousOrders)
      console.error("Failed to update order status. Please try again.")
      console.error("Error updating status:", err)
      setError("Failed to update order status. Please try again.")
    } finally {
      // Remove loading state
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: false }))
    }
  }

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now - new Date(date)) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  // Format delivery address
  const formatDeliveryAddress = (address) => {
    if (typeof address === "string") return address
    return `${address.BuildingName}, ${address.street}, ${address.city}, ${address.pincode}`
  }

  // Get order ID (handle both _id and id)
  const getOrderId = (order) => order._id || order.id

  // Get order display ID
  const getOrderDisplayId = (order) => {
    const id = getOrderId(order)
    return id.length > 10 ? `ORD-${id.slice(-6)}` : `ORD-${id}`
  }

  // Filter orders based on active tab and search term
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab
    const orderId = getOrderDisplayId(order)
    const customerName = order.user?.name || order.customerName || ""

    const matchesSearch =
        orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  // Get order counts for each status
  const getStatusCount = (status) => {
    if (status === "all") return orders.length
    return orders.filter((order) => order.status === status).length
  }

  // Custom Components
  const Card = ({ children, className = "" }) => <div className={`card ${className}`}>{children}</div>

  const CardHeader = ({ children, className = "" }) => <div className={`card-header ${className}`}>{children}</div>

  const CardContent = ({ children, className = "" }) => <div className={`card-content ${className}`}>{children}</div>

  const Badge = ({ children, className = "" }) => <span className={`badge ${className}`}>{children}</span>

  const Button = ({ children, onClick, disabled = false, className = "" }) => (
      <button
          onClick={onClick}
          disabled={disabled}
          className={`button ${className} ${disabled ? "button-disabled" : ""}`}
      >
        {children}
      </button>
  )

  const Input = ({ placeholder, value, onChange, className = "" }) => (
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} className={`input ${className}`} />
  )

  const Skeleton = ({ className = "" }) => <div className={`skeleton ${className}`}></div>

  const Dropdown = ({ trigger, children, isOpen, onToggle, orderId }) => (
      <div className="dropdown-container">
        <div
            onClick={(e) => {
              e.stopPropagation()
              onToggle(orderId)
            }}
        >
          {trigger}
        </div>
        {isOpen && <div className="dropdown-content">{children}</div>}
      </div>
  )

  const DropdownItem = ({ children, onClick, className = "" }) => (
      <div onClick={onClick} className={`dropdown-item ${className}`}>
        {children}
      </div>
  )

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const config = statusConfig[status]
    return <Badge className={`status-badge ${config.color}`}>{config.label}</Badge>
  }

  // Order Card Component
  const OrderCard = ({ order }) => {
    const orderId = getOrderId(order)
    const displayId = getOrderDisplayId(order)
    const customerName = order.user?.name || order.customerName || "Unknown Customer"
    const customerPhone = order.user?.phone || order.customerPhone || "No phone"
    const deliveryAddress = formatDeliveryAddress(order.deliveryAddress)

    return (
        <Card className="order-card">
          <CardHeader className="order-card-header">
            <div className="order-header-content">
              <div className="order-info">
                <h3 className="order-title">Order {displayId}</h3>
                <div className="customer-info">
                  <div className="customer-detail">
                    <User className="icon" />
                    {customerName}
                  </div>
                  <div className="customer-detail">
                    <Phone className="icon" />
                    {customerPhone}
                  </div>
                </div>
              </div>
              <div className="order-actions">
                <StatusBadge status={order.status} />
                <Dropdown
                    trigger={
                      <Button disabled={updatingStatus[orderId]} className="update-status-btn">
                        {updatingStatus[orderId] ? "Updating..." : "Update Status"}
                        <ChevronDown className="icon-small" />
                      </Button>
                    }
                    isOpen={openDropdown === orderId}
                    onToggle={(id) => setOpenDropdown(openDropdown === id ? null : id)}
                    orderId={orderId}
                >
                  {Object.entries(statusConfig).map(([status, config]) => (
                      <DropdownItem
                          key={status}
                          onClick={() => handleStatusUpdate(orderId, status)}
                          className={config.textColor}
                      >
                        {config.label}
                      </DropdownItem>
                  ))}
                </Dropdown>
              </div>
            </div>
          </CardHeader>

          <CardContent className="order-card-content">
            {/* Order Items */}
            <div className="order-items-section">
              <h4 className="section-title">Order Items:</h4>
              <div className="items-list">
                {order.items.map((item, index) => (
                    <div key={index} className="item-row">
                  <span className="item-name">
                    {item.quantity}x {item.food?.name || item.name}
                  </span>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
              </div>
              <div className="total-section">
                <div className="total-row">
                  <span>Total:</span>
                  <span className="total-amount">${(order.totalPrice || order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="delivery-section">
              <div className="delivery-info">
                <MapPin className="icon-small" />
                <span>{deliveryAddress}</span>
              </div>
            </div>

            {/* Order Time and Delivery Time */}
            <div className="order-time">
              <Clock className="icon-small" />
              <span>Ordered {formatTimeAgo(order.orderedAt || order.createdAt)}</span>
              {order.deliveryTime && (
                  <span className="delivery-time">
                • Expected delivery: {new Date(order.deliveryTime).toLocaleTimeString()}
              </span>
              )}
            </div>
          </CardContent>
        </Card>
    )
  }

  // Loading Skeleton Component
  const OrderSkeleton = () => (
      <Card className="order-card">
        <CardHeader className="order-card-header">
          <div className="skeleton-header">
            <div className="skeleton-info">
              <Skeleton className="skeleton-title" />
              <Skeleton className="skeleton-subtitle" />
            </div>
            <Skeleton className="skeleton-button" />
          </div>
        </CardHeader>
        <CardContent className="order-card-content">
          <div className="skeleton-content">
            <Skeleton className="skeleton-line-full" />
            <Skeleton className="skeleton-line-three-quarter" />
            <Skeleton className="skeleton-line-half" />
          </div>
        </CardContent>
      </Card>
  )

  return (
      <div className="orders-container">
        <div className="orders-wrapper">
          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Orders</h1>
            <p className="page-subtitle">Manage and track your restaurant orders</p>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <Input
                  placeholder="Search by order ID or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
              />
            </div>
          </div>

          {/* Status Tabs */}
          <div className="tabs-section">
            <div className="tabs-list">
              {[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "preparing", label: "Preparing" },
                { value: "delivering", label: "Delivering" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ].map((tab) => (
                  <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`tab-trigger ${activeTab === tab.value ? `tab-active-${tab.value}` : ""}`}
                  >
                    {tab.label} ({getStatusCount(tab.value)})
                  </button>
              ))}
            </div>

            {/* Orders Content */}
            <div className="orders-content">
              {loading ? (
                  // Loading State
                  <div className="loading-container">
                    {[...Array(3)].map((_, index) => (
                        <OrderSkeleton key={index} />
                    ))}
                  </div>
              ) : error ? (
                  // Error State
                  <Card className="error-card">
                    <div className="error-content">
                      <div className="error-icon">
                        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="error-title">Failed to Load Orders</h3>
                      <p className="error-message">{error}</p>
                      <Button onClick={() => window.location.reload()} className="retry-button">
                        Try Again
                      </Button>
                    </div>
                  </Card>
              ) : filteredOrders.length === 0 ? (
                  // Empty State
                  <Card className="empty-card">
                    <div className="empty-content">
                      <div className="empty-icon">
                        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h3 className="empty-title">No Orders Found</h3>
                      <p className="empty-message">
                        {searchTerm
                            ? "No orders match your search criteria."
                            : activeTab === "all"
                                ? "You don't have any orders yet."
                                : `No ${statusConfig[activeTab]?.label.toLowerCase()} orders found.`}
                      </p>
                    </div>
                  </Card>
              ) : (
                  // Orders List
                  <div className="orders-list">
                    {filteredOrders.map((order) => (
                        <OrderCard key={getOrderId(order)} order={order} />
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}
