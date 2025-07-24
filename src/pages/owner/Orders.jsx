"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, Search, User, ChevronDown } from "lucide-react"
import "./Orders.css"
import axios from "axios"

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

  // Status configuration with colors
  const statusConfig = {
    pending: { label: "Pending", color: "status-pending", textColor: "text-pending" },
    confirmed: { label: "Confirmed", color: "status-confirmed", textColor: "text-confirmed" },
    preparing: { label: "Preparing", color: "status-preparing", textColor: "text-preparing" },
    ready: { label: "Ready", color: "status-ready", textColor: "text-ready" },
    delivered: { label: "Delivered", color: "status-delivered", textColor: "text-delivered" },
    cancelled: { label: "Cancelled", color: "status-cancelled", textColor: "text-cancelled" },
  }

  // Mock data for demonstration - remove when connecting to real API
  const mockOrders = [
    {
      id: "ORD-001",
      customerName: "John Smith",
      customerPhone: "+1 (555) 123-4567",
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 24.99 },
        { name: "Caesar Salad", quantity: 1, price: 12.99 },
      ],
      total: 62.97,
      status: "pending",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    },
    {
      id: "ORD-002",
      customerName: "Sarah Johnson",
      customerPhone: "+1 (555) 987-6543",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 15.99 },
        { name: "French Fries", quantity: 1, price: 6.99 },
        { name: "Coke", quantity: 2, price: 4.99 },
      ],
      total: 27.97,
      status: "preparing",
      createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      deliveryAddress: "456 Oak Ave, Brooklyn, NY 11201",
    },
    {
      id: "ORD-003",
      customerName: "Mike Davis",
      customerPhone: "+1 (555) 456-7890",
      items: [
        { name: "Pasta Carbonara", quantity: 1, price: 18.99 },
        { name: "Garlic Bread", quantity: 1, price: 7.99 },
      ],
      total: 26.98,
      status: "ready",
      createdAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      deliveryAddress: "789 Pine St, Manhattan, NY 10002",
    },
  ]

  // useEffect(()=>{
  //   axios.get(`http://localhost:5000/api/restaurant/687f3729543d530803584444`)
  //   .then((res)=>{
  //       console.log(res.data)
  //   })
  //   .catch((err)=>{
  //     console.log('Error Occured ',err)
  //   })
  // }, [])

  //  useEffect(() => {
  // const fetchRestaurant = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/restaurant/687f3729543d530803584444", {
  //       credentials: "include",
  //     });

  //     if (!res.ok) {
  //       const text = await res.text(); // could be HTML
  //       throw new Error(`Server error ${res.status}: ${text.slice(0, 100)}...`);
  //     }

  //     const data = await res.json();
  //     console.log(data);
  //   } catch (err) {
  //     console.error("Fetch error:", err.message);
  //   }
  // };

//   fetchRestaurant();
// }, []);

useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/restaurant/687f3729543d530803584444', {
          credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Initialize with mock data - remove when using real API
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      // fetchOrders() // Uncomment when using real API
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call - replace with actual endpoint
      const response = await fetch(`/api/orders/restaurant/${restaurantId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      setOrders(data)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching orders:", err)
    } finally {
      setLoading(false)
    }
  }

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    const previousOrders = [...orders] // Store previous state for rollback
    try {
      // Set loading state for this specific order
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: true }))

      // Optimistic update - update UI immediately
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

      // Close dropdown
      setOpenDropdown(null)

      // Make API call to update status
      const response = await fetch(`/api/orders/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      // Show success message (you can replace with your preferred toast library)
      console.log(`Order ${orderId} status changed to ${statusConfig[newStatus].label}`)
    } catch (err) {
      // Rollback optimistic update on error
      setOrders(previousOrders)
      console.error("Failed to update order status. Please try again.")
      console.error("Error updating status:", err)
    } finally {
      // Remove loading state
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: false }))
    }
  }

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  // Filter orders based on active tab and search term
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())

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
  const OrderCard = ({ order }) => (
    <Card className="order-card">
      <CardHeader className="order-card-header">
        <div className="order-header-content">
          <div className="order-info">
            <h3 className="order-title">Order {order.id}</h3>
            <div className="customer-info">
              <div className="customer-detail">
                <User className="icon" />
                {order.customerName}
              </div>
              <div className="customer-detail">
                <Phone className="icon" />
                {order.customerPhone}
              </div>
            </div>
          </div>
          <div className="order-actions">
            <StatusBadge status={order.status} />
            <Dropdown
              trigger={
                <Button disabled={updatingStatus[order.id]} className="update-status-btn">
                  Update Status
                  <ChevronDown className="icon-small" />
                </Button>
              }
              isOpen={openDropdown === order.id}
              onToggle={(orderId) => setOpenDropdown(openDropdown === orderId ? null : orderId)}
              orderId={order.id}
            >
              {Object.entries(statusConfig).map(([status, config]) => (
                <DropdownItem
                  key={status}
                  onClick={() => handleStatusUpdate(order.id, status)}
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
                  {item.quantity}x {item.name}
                </span>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="total-section">
            <div className="total-row">
              <span>Total:</span>
              <span className="total-amount">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="delivery-section">
          <div className="delivery-info">
            <MapPin className="icon-small" />
            <span>{order.deliveryAddress}</span>
          </div>
        </div>

        {/* Order Time */}
        <div className="order-time">
          <Clock className="icon-small" />
          <span>Ordered {formatTimeAgo(order.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  )

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
              { value: "confirmed", label: "Confirmed" },
              { value: "preparing", label: "Preparing" },
              { value: "ready", label: "Ready" },
              { value: "delivered", label: "Delivered" },
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
                  <Button onClick={fetchOrders} className="retry-button">
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
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
